const { widget } = figma;
const { useSyncedMap, useSyncedState, useEffect } = widget;

import { brand, semantic } from "design-system/theme/default";
import { capAvatarIds } from "shared/avatarStack";

type AvatarProfile = {
  id: string;
  name: string;
  initials: string;
  photoUrl?: string | null;
  color?: string | null;
  sessionId?: number | null;
};

export type AvatarDisplay = {
  id: string;
  name: string;
  type: "image" | "initials";
  src?: string;
  initials?: string;
  fill?: string;
  textColor?: string;
};

type UseAvatarProfilesOptions = {
  accentColor: string;
  neutralDark: string;
  neutralLight: string;
  max?: number;
};

const normalizeHex = (hex: string): string | null => {
  const raw = hex.replace("#", "").trim();
  if (raw.length === 3 && /^[0-9a-fA-F]{3}$/.test(raw)) {
    return raw
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (raw.length === 6 && /^[0-9a-fA-F]{6}$/.test(raw)) {
    return raw;
  }
  if (raw.length === 8 && /^[0-9a-fA-F]{8}$/.test(raw)) {
    return raw.slice(0, 6);
  }
  return null;
};

const isLightColor = (hex: string) => {
  const value = normalizeHex(hex);
  if (!value) return false;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
};

const toOpaqueHex = (color: string | null | undefined): string | null => {
  if (!color) return null;
  const normalized = normalizeHex(color);
  return normalized ? `#${normalized.toUpperCase()}` : null;
};

const FALLBACK_AVATAR_COLORS = [
  brand.accent.light,
  semantic.success.dark,
  semantic.warning.dark,
  brand.accent.medium,
  semantic.info.dark,
  semantic.warning.medium,
  semantic.error.dark,
  semantic.success.medium,
];

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const resolveFallbackAvatarColor = (id: string, accentColor: string) => {
  const resolvedAccent = toOpaqueHex(accentColor);
  const palette = resolvedAccent
    ? [resolvedAccent, ...FALLBACK_AVATAR_COLORS]
    : FALLBACK_AVATAR_COLORS;
  return palette[hashString(id) % palette.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

const resolveUserId = (
  id: string | null,
  sessionId: number | null,
  name: string,
) => {
  if (id) return id;
  if (sessionId !== null && sessionId !== undefined) {
    return `session:${sessionId}`;
  }
  if (name.trim().length > 0) return `name:${name}`;
  return null;
};

const TEST_AVATAR_ID_PATTERN = /^test:\d+$/;
const SHOW_DEBUG_TEST_AVATARS = false;
const DEBUG_TEST_AVATARS = [
  { id: "test:1", name: "Ava Test", color: brand.accent.light },
  { id: "test:2", name: "Lee Sample", color: semantic.success.dark },
  { id: "test:3", name: "Kai Demo", color: semantic.warning.dark },
  { id: "test:4", name: "Riley QA", color: brand.accent.medium },
];
const DEBUG_TEST_AVATAR_COLOR_BY_ID = DEBUG_TEST_AVATARS.reduce<
  Record<string, string>
>((acc, profile) => {
  acc[profile.id] = profile.color;
  return acc;
}, {});

export function useAvatarProfiles(options: UseAvatarProfilesOptions) {
  const { accentColor, neutralDark, neutralLight, max = 5 } = options;
  const avatarProfiles = useSyncedMap<AvatarProfile>("avatarProfiles");
  const [avatarIds, setAvatarIds] = useSyncedState<string[]>("avatarIds", []);

  const upsertAvatar = (profile: AvatarProfile) => {
    const existing = avatarProfiles.get(profile.id);
    const hasChanges =
      !existing ||
      existing.photoUrl !== profile.photoUrl ||
      existing.name !== profile.name ||
      existing.color !== profile.color ||
      existing.initials !== profile.initials ||
      existing.sessionId !== profile.sessionId;
    if (hasChanges) {
      avatarProfiles.set(profile.id, profile);
    }
    const nextIds = [
      profile.id,
      ...avatarIds.filter((id) => id !== profile.id),
    ];
    if (nextIds.join("|") !== avatarIds.join("|")) {
      setAvatarIds(nextIds);
    }
  };

  const recordInteraction = () => {
    const currentUser = figma.currentUser;
    if (!currentUser) return;
    const resolvedId = resolveUserId(
      currentUser.id ?? null,
      currentUser.sessionId ?? null,
      currentUser.name,
    );
    if (!resolvedId) return;
    upsertAvatar({
      id: resolvedId,
      name: currentUser.name,
      initials: getInitials(currentUser.name),
      photoUrl: currentUser.photoUrl ?? null,
      color: currentUser.color ?? null,
      sessionId: currentUser.sessionId ?? null,
    });
  };

  // Figma Widget useEffect does not support a dependency array.
  useEffect(() => {
    if (SHOW_DEBUG_TEST_AVATARS) {
      const debugIds = DEBUG_TEST_AVATARS.map((profile) => profile.id);
      DEBUG_TEST_AVATARS.forEach((profile) => {
        const existing = avatarProfiles.get(profile.id);
        const nextInitials = getInitials(profile.name);
        const needsUpdate =
          !existing ||
          existing.name !== profile.name ||
          existing.initials !== nextInitials ||
          existing.photoUrl !== null ||
          existing.sessionId !== null ||
          existing.color !== profile.color;
        if (needsUpdate) {
          avatarProfiles.set(profile.id, {
            id: profile.id,
            name: profile.name,
            initials: nextInitials,
            photoUrl: null,
            color: profile.color,
            sessionId: null,
          });
        }
      });
      const currentUser = figma.currentUser;
      const currentUserId =
        currentUser &&
        resolveUserId(
          currentUser.id ?? null,
          currentUser.sessionId ?? null,
          currentUser.name,
        );
      // Keep the active real user first, then debug avatars for deterministic screenshots.
      const nextIds = [
        ...(currentUserId ? [currentUserId] : []),
        ...debugIds.filter((id) => id !== currentUserId),
      ];
      if (nextIds.join("|") !== avatarIds.join("|")) {
        setAvatarIds(nextIds);
      }
      return;
    }

    const testIds = avatarIds.filter((id) => TEST_AVATAR_ID_PATTERN.test(id));
    if (testIds.length === 0) {
      return;
    }
    const nextIds = avatarIds.filter((id) => !TEST_AVATAR_ID_PATTERN.test(id));
    if (nextIds.join("|") !== avatarIds.join("|")) {
      setAvatarIds(nextIds);
    }
    testIds.forEach((id) => {
      if (avatarProfiles.get(id)) {
        avatarProfiles.delete(id);
      }
    });
  });

  const validAvatarIds = avatarIds.filter((id) =>
    Boolean(avatarProfiles.get(id)),
  );
  const visibleAvatarIds = capAvatarIds(validAvatarIds, max);
  const profiles = visibleAvatarIds
    .map((id) => avatarProfiles.get(id))
    .filter((profile): profile is AvatarProfile => Boolean(profile));
  const overflowCount = Math.max(0, validAvatarIds.length - profiles.length);
  const overflowNames = validAvatarIds
    .slice(visibleAvatarIds.length)
    .map((id) => avatarProfiles.get(id)?.name?.trim() ?? "")
    .filter((name) => name.length > 0);

  const avatars: AvatarDisplay[] = profiles.map((profile) => {
    if (profile.photoUrl) {
      return {
        id: profile.id,
        name: profile.name,
        type: "image",
        src: profile.photoUrl,
      };
    }
    const debugColor =
      SHOW_DEBUG_TEST_AVATARS && TEST_AVATAR_ID_PATTERN.test(profile.id)
        ? DEBUG_TEST_AVATAR_COLOR_BY_ID[profile.id]
        : null;
    const fill =
      toOpaqueHex(debugColor) ??
      toOpaqueHex(profile.color) ??
      resolveFallbackAvatarColor(profile.id, accentColor);
    const textColor = isLightColor(fill) ? neutralDark : neutralLight;
    return {
      id: profile.id,
      name: profile.name,
      type: "initials",
      initials: profile.initials,
      fill,
      textColor,
    };
  });

  return { avatars, overflowCount, overflowNames, recordInteraction };
}
