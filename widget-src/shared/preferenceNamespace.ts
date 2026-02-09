export type PreferenceNamespaceInput = {
  userId?: string | null;
  sessionId?: number | null;
  widgetId?: string | null;
};

export type PreferenceNamespace = {
  userScope: string;
  widgetScope: string;
  mapKey: string;
  legacyKeys: string[];
};

function hasContent(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function encodeScopeValue(value: string): string {
  return encodeURIComponent(value.trim());
}

export function resolveUserScope(
  userId?: string | null,
  sessionId?: number | null
): string {
  if (hasContent(userId)) {
    return `id:${encodeScopeValue(userId)}`;
  }
  if (sessionId !== null && sessionId !== undefined) {
    return `session:${sessionId}`;
  }
  return "anonymous";
}

export function resolveWidgetScope(widgetId?: string | null): string {
  return hasContent(widgetId) ? encodeScopeValue(widgetId) : "unknown";
}

export function buildPreferenceMapKey(
  userScope: string,
  widgetScope: string
): string {
  return `prefs:user:${userScope}:widget:${widgetScope}`;
}

export function resolvePreferenceNamespace({
  userId,
  sessionId,
  widgetId,
}: PreferenceNamespaceInput): PreferenceNamespace {
  const userScope = resolveUserScope(userId, sessionId);
  const widgetScope = resolveWidgetScope(widgetId);
  const mapKey = buildPreferenceMapKey(userScope, widgetScope);
  const legacyKeys: string[] = [];

  if (hasContent(userId)) {
    legacyKeys.push(`user:${userId}`);
  }

  if (sessionId !== null && sessionId !== undefined) {
    legacyKeys.push(`user:session:${sessionId}`);
  }

  legacyKeys.push("user:default");

  return {
    userScope,
    widgetScope,
    mapKey,
    legacyKeys,
  };
}
