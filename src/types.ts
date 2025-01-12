import type {
	AutoFocusOptions,
	ILogger,
	ThemeOptions
} from '@descope/web-component';
import DescopeWc from '@descope/web-component';
import UserManagementWidget from '@descope/user-management-widget';
import type { UserResponse } from '@descope/web-js-sdk';
import React, { DOMAttributes } from 'react';
import RoleManagementWidget from '@descope/role-management-widget';
import AccessKeyManagementWidget from '@descope/access-key-management-widget';
import AuditManagementWidget from '@descope/audit-management-widget';
import UserProfileWidget from '@descope/user-profile-widget';
import createSdk from './sdk';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			['descope-wc']: DescopeCustomElement;
			['descope-user-management-widget']: UserManagementCustomElement;
			['descope-role-management-widget']: RoleManagementCustomElement;
			['descope-access-key-management-widget']: AccessKeyManagementCustomElement;
			['descope-audit-management-widget']: AuditManagementCustomElement;
			['descope-user-profile-widget']: UserProfileCustomElement;
		}
	}
}

type WidgetProps = {
	logger?: ILogger;
	tenant: string;
	widgetId: string;
	// If theme is not provided - the OS theme will be used
	theme?: ThemeOptions;
	debug?: boolean;
};

export type User = UserResponse;

export type Sdk = ReturnType<typeof createSdk>;

export type CustomEvents<K extends string> = {
	[key in K]: (event: CustomEvent) => void;
};

export type CustomElement<T, K extends string = ''> = Partial<
	T &
		DOMAttributes<T> & {
			children: React.ReactChild;
			ref: React.Ref<HTMLElement>;
		} & CustomEvents<`on${K}`>
>;

export type DescopeCustomElement = CustomElement<
	DescopeWc,
	'success' | 'error' | 'ready'
>;

export type UserManagementCustomElement = CustomElement<
	typeof UserManagementWidget & UserManagementProps
>;

export type RoleManagementCustomElement = CustomElement<
	typeof RoleManagementWidget & RoleManagementProps
>;

export type AccessKeyManagementCustomElement = CustomElement<
	typeof AccessKeyManagementWidget & AccessKeyManagementProps
>;

export type AuditManagementCustomElement = CustomElement<
	typeof AuditManagementWidget & AuditManagementProps
>;

export type UserProfileCustomElement = CustomElement<
	typeof UserProfileWidget & UserProfileProps
>;

export interface IContext {
	fetchUser: () => void;
	user: User;
	isUserLoading: boolean;
	fetchSession: () => void;
	session: string;
	isSessionLoading: boolean;
	isSessionFetched: boolean;
	projectId: string;
	baseUrl?: string;
	storeLastAuthenticatedUser?: boolean;
	sdk?: Sdk;
	setUser: React.Dispatch<React.SetStateAction<User>>;
	setSession: React.Dispatch<React.SetStateAction<string>>;
}

export type DescopeProps = {
	flowId: string;
	onSuccess?: DescopeCustomElement['onsuccess'];
	onError?: DescopeCustomElement['onerror'];
	onReady?: DescopeCustomElement['onready'];
	logger?: ILogger;
	tenant?: string;
	// If theme is not provided - the OS theme will be used
	theme?: ThemeOptions;
	// If locale is not provided - the browser's locale will be used
	locale?: string;
	autoFocus?: AutoFocusOptions;
	debug?: boolean;
	telemetryKey?: string;
	redirectUrl?: string;
	errorTransformer?: (error: { text: string; type: string }) => string;
	// use to override screen's form inputs in flow execution
	form?: Record<string, any>;
	// use to override client context in flow execution
	client?: Record<string, any>;
};

export type UserManagementProps = WidgetProps;

export type RoleManagementProps = WidgetProps;

export type AccessKeyManagementProps = WidgetProps;

export type AuditManagementProps = WidgetProps;

export type UserProfileProps = Omit<WidgetProps, 'tenant'> & {
	onLogout?: (e: CustomEvent) => void;
};

export type { ILogger };
export type DefaultFlowProps = Omit<DescopeProps, 'flowId'>;
