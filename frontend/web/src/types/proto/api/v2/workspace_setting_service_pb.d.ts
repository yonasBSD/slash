// @generated by protoc-gen-es v1.3.0
// @generated from file api/v2/workspace_setting_service.proto (package slash.api.v2, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message slash.api.v2.WorkspaceSetting
 */
export declare class WorkspaceSetting extends Message<WorkspaceSetting> {
  /**
   * Whether to enable other users to sign up.
   *
   * @generated from field: bool enable_signup = 1;
   */
  enableSignup: boolean;

  /**
   * The relative path of the resource directory.
   *
   * @generated from field: string resource_relative_path = 2;
   */
  resourceRelativePath: string;

  /**
   * The auto backup setting.
   *
   * @generated from field: slash.api.v2.AutoBackupWorkspaceSetting auto_backup = 3;
   */
  autoBackup?: AutoBackupWorkspaceSetting;

  constructor(data?: PartialMessage<WorkspaceSetting>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.WorkspaceSetting";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WorkspaceSetting;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WorkspaceSetting;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WorkspaceSetting;

  static equals(a: WorkspaceSetting | PlainMessage<WorkspaceSetting> | undefined, b: WorkspaceSetting | PlainMessage<WorkspaceSetting> | undefined): boolean;
}

/**
 * @generated from message slash.api.v2.AutoBackupWorkspaceSetting
 */
export declare class AutoBackupWorkspaceSetting extends Message<AutoBackupWorkspaceSetting> {
  /**
   * Whether auto backup is enabled.
   *
   * @generated from field: bool enabled = 1;
   */
  enabled: boolean;

  /**
   * The cron expression for auto backup.
   * For example, "0 0 0 * * *" means backup at 00:00:00 every day.
   * See https://en.wikipedia.org/wiki/Cron for more details.
   *
   * @generated from field: string cron_expression = 2;
   */
  cronExpression: string;

  /**
   * The maximum number of backups to keep.
   *
   * @generated from field: int32 max_keep = 3;
   */
  maxKeep: number;

  constructor(data?: PartialMessage<AutoBackupWorkspaceSetting>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.AutoBackupWorkspaceSetting";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AutoBackupWorkspaceSetting;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AutoBackupWorkspaceSetting;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AutoBackupWorkspaceSetting;

  static equals(a: AutoBackupWorkspaceSetting | PlainMessage<AutoBackupWorkspaceSetting> | undefined, b: AutoBackupWorkspaceSetting | PlainMessage<AutoBackupWorkspaceSetting> | undefined): boolean;
}

/**
 * @generated from message slash.api.v2.GetWorkspaceSettingRequest
 */
export declare class GetWorkspaceSettingRequest extends Message<GetWorkspaceSettingRequest> {
  constructor(data?: PartialMessage<GetWorkspaceSettingRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.GetWorkspaceSettingRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetWorkspaceSettingRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetWorkspaceSettingRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetWorkspaceSettingRequest;

  static equals(a: GetWorkspaceSettingRequest | PlainMessage<GetWorkspaceSettingRequest> | undefined, b: GetWorkspaceSettingRequest | PlainMessage<GetWorkspaceSettingRequest> | undefined): boolean;
}

/**
 * @generated from message slash.api.v2.GetWorkspaceSettingResponse
 */
export declare class GetWorkspaceSettingResponse extends Message<GetWorkspaceSettingResponse> {
  /**
   * The user setting.
   *
   * @generated from field: slash.api.v2.WorkspaceSetting setting = 1;
   */
  setting?: WorkspaceSetting;

  constructor(data?: PartialMessage<GetWorkspaceSettingResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.GetWorkspaceSettingResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GetWorkspaceSettingResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GetWorkspaceSettingResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GetWorkspaceSettingResponse;

  static equals(a: GetWorkspaceSettingResponse | PlainMessage<GetWorkspaceSettingResponse> | undefined, b: GetWorkspaceSettingResponse | PlainMessage<GetWorkspaceSettingResponse> | undefined): boolean;
}

/**
 * @generated from message slash.api.v2.UpdateWorkspaceSettingRequest
 */
export declare class UpdateWorkspaceSettingRequest extends Message<UpdateWorkspaceSettingRequest> {
  /**
   * The user setting.
   *
   * @generated from field: slash.api.v2.WorkspaceSetting setting = 1;
   */
  setting?: WorkspaceSetting;

  /**
   * The update mask.
   *
   * @generated from field: repeated string update_mask = 2;
   */
  updateMask: string[];

  constructor(data?: PartialMessage<UpdateWorkspaceSettingRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.UpdateWorkspaceSettingRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateWorkspaceSettingRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateWorkspaceSettingRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateWorkspaceSettingRequest;

  static equals(a: UpdateWorkspaceSettingRequest | PlainMessage<UpdateWorkspaceSettingRequest> | undefined, b: UpdateWorkspaceSettingRequest | PlainMessage<UpdateWorkspaceSettingRequest> | undefined): boolean;
}

/**
 * @generated from message slash.api.v2.UpdateWorkspaceSettingResponse
 */
export declare class UpdateWorkspaceSettingResponse extends Message<UpdateWorkspaceSettingResponse> {
  /**
   * The user setting.
   *
   * @generated from field: slash.api.v2.WorkspaceSetting setting = 1;
   */
  setting?: WorkspaceSetting;

  constructor(data?: PartialMessage<UpdateWorkspaceSettingResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "slash.api.v2.UpdateWorkspaceSettingResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdateWorkspaceSettingResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdateWorkspaceSettingResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdateWorkspaceSettingResponse;

  static equals(a: UpdateWorkspaceSettingResponse | PlainMessage<UpdateWorkspaceSettingResponse> | undefined, b: UpdateWorkspaceSettingResponse | PlainMessage<UpdateWorkspaceSettingResponse> | undefined): boolean;
}
