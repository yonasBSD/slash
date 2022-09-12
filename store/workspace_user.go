package store

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/boojack/corgi/api"
	"github.com/boojack/corgi/common"
)

// workspaceUserRaw is the store model for WorkspaceUser.
type workspaceUserRaw struct {
	WorkspaceID int
	UserID      int
	Role        api.Role
	CreatedTs   int64
	UpdatedTs   int64
}

func (raw *workspaceUserRaw) toWorkspaceUser() *api.WorkspaceUser {
	return &api.WorkspaceUser{
		WorkspaceID: raw.WorkspaceID,
		UserID:      raw.UserID,
		Role:        raw.Role,
		CreatedTs:   raw.CreatedTs,
		UpdatedTs:   raw.UpdatedTs,
	}
}

func (s *Store) UpsertWorkspaceUser(ctx context.Context, upsert *api.WorkspaceUserUpsert) (*api.WorkspaceUser, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, FormatError(err)
	}
	defer tx.Rollback()

	workspaceUserRaw, err := upsertWorkspaceUser(ctx, tx, upsert)
	if err != nil {
		return nil, err
	}

	if err := tx.Commit(); err != nil {
		return nil, FormatError(err)
	}

	workspaceUser := workspaceUserRaw.toWorkspaceUser()

	return workspaceUser, nil
}

func (s *Store) FindWordspaceUserList(ctx context.Context, find *api.WorkspaceUserFind) ([]*api.WorkspaceUser, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, FormatError(err)
	}
	defer tx.Rollback()

	workspaceUserRawList, err := findWorkspaceUserList(ctx, tx, find)
	if err != nil {
		return nil, err
	}

	list := []*api.WorkspaceUser{}
	for _, raw := range workspaceUserRawList {
		list = append(list, raw.toWorkspaceUser())
	}

	return list, nil
}

func (s *Store) FindWordspaceUser(ctx context.Context, find *api.WorkspaceUserFind) (*api.WorkspaceUser, error) {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, FormatError(err)
	}
	defer tx.Rollback()

	list, err := findWorkspaceUserList(ctx, tx, find)
	if err != nil {
		return nil, err
	}

	if len(list) == 0 {
		return nil, &common.Error{Code: common.NotFound, Err: fmt.Errorf("not found workspace user with filter %+v", find)}
	} else if len(list) > 1 {
		return nil, &common.Error{Code: common.Conflict, Err: fmt.Errorf("found %d workspaces user with filter %+v, expect 1", len(list), find)}
	}

	workspaceUser := list[0].toWorkspaceUser()
	return workspaceUser, nil
}

func (s *Store) DeleteWorkspaceUser(ctx context.Context, delete *api.WorkspaceUserDelete) error {
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil {
		return FormatError(err)
	}
	defer tx.Rollback()

	err = deleteWorkspaceUser(ctx, tx, delete)
	if err != nil {
		return FormatError(err)
	}

	if err := tx.Commit(); err != nil {
		return FormatError(err)
	}

	return nil
}

func upsertWorkspaceUser(ctx context.Context, tx *sql.Tx, upsert *api.WorkspaceUserUpsert) (*workspaceUserRaw, error) {
	query := `
		INSERT INTO workspace_user (
			workspace_id,
			user_id,
			role,
			updated_ts
		)
		VALUES (?, ?, ?, ?)
		ON CONFLICT(workspace_id, user_id) DO UPDATE 
		SET
			role = EXCLUDED.role,
			updated_ts = EXCLUDED.updated_ts
		RETURNING workspace_id, user_id, role, created_ts, updated_ts
	`
	var workspaceUserRaw workspaceUserRaw
	if err := tx.QueryRowContext(ctx, query,
		upsert.WorkspaceID,
		upsert.UserID,
		upsert.Role,
		upsert.UpdatedTs,
	).Scan(
		&workspaceUserRaw.WorkspaceID,
		&workspaceUserRaw.UserID,
		&workspaceUserRaw.Role,
		&workspaceUserRaw.CreatedTs,
		&workspaceUserRaw.UpdatedTs,
	); err != nil {
		return nil, FormatError(err)
	}

	return &workspaceUserRaw, nil
}

func findWorkspaceUserList(ctx context.Context, tx *sql.Tx, find *api.WorkspaceUserFind) ([]*workspaceUserRaw, error) {
	where, args := []string{"1 = 1"}, []interface{}{}

	if v := find.WorkspaceID; v != nil {
		where, args = append(where, "workspace_id = ?"), append(args, *v)
	}
	if v := find.UserID; v != nil {
		where, args = append(where, "user_id = ?"), append(args, *v)
	}

	query := `
		SELECT 
			workspace_id,
			user_id,
			role,
			created_ts,
			updated_ts
		FROM workspace_user
		WHERE ` + strings.Join(where, " AND ") + `
		ORDER BY updated_ts DESC, created_ts DESC
	`
	rows, err := tx.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, FormatError(err)
	}
	defer rows.Close()

	workspaceUserRawList := make([]*workspaceUserRaw, 0)
	for rows.Next() {
		var workspaceUserRaw workspaceUserRaw
		if err := rows.Scan(
			&workspaceUserRaw.WorkspaceID,
			&workspaceUserRaw.UserID,
			&workspaceUserRaw.Role,
			&workspaceUserRaw.CreatedTs,
			&workspaceUserRaw.UpdatedTs,
		); err != nil {
			return nil, FormatError(err)
		}

		workspaceUserRawList = append(workspaceUserRawList, &workspaceUserRaw)
	}

	if err := rows.Err(); err != nil {
		return nil, FormatError(err)
	}

	return workspaceUserRawList, nil
}

func deleteWorkspaceUser(ctx context.Context, tx *sql.Tx, delete *api.WorkspaceUserDelete) error {
	result, err := tx.ExecContext(ctx, `
		PRAGMA foreign_keys = ON;
		DELETE FROM workspace_user WHERE workspace_id = ? AND user_id = ?
	`, delete.WorkspaceID, delete.UserID)
	if err != nil {
		return FormatError(err)
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return &common.Error{Code: common.NotFound, Err: fmt.Errorf("workspace user not found")}
	}

	return nil
}
