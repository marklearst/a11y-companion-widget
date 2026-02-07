const { widget } = figma;
const { useSyncedMap, useSyncedState, useEffect } = widget;

import { defaultTheme, withOpacity } from "design-system/theme/default";
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

const normalizeHex = (hex: string) => {
  const raw = hex.replace("#", "").trim();
  if (raw.length === 3) {
    return raw
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (raw.length === 8) return raw.slice(0, 6);
  return raw.padEnd(6, "0");
};

const isLightColor = (hex: string) => {
  const value = normalizeHex(hex);
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
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
  name: string
) => {
  if (id) return id;
  if (sessionId !== null && sessionId !== undefined) {
    return `session:${sessionId}`;
  }
  if (name.trim().length > 0) return `name:${name}`;
  return null;
};

const ENABLE_TEST_AVATARS = true;
const TEST_AVATAR_NAMES = [
  "Ava Test",
  "Lee Sample",
  "Kai Demo",
  "Riley QA",
  "Morgan UX",
];
const TEST_AVATAR_COLORS = [
  defaultTheme.brand.purple[100],
  defaultTheme.neutral.gray[100],
  defaultTheme.semantic.success.light,
  defaultTheme.semantic.warning.light,
  defaultTheme.semantic.info.light,
];

export function useAvatarProfiles(options: UseAvatarProfilesOptions) {
  const { accentColor, neutralDark, neutralLight, max = 5 } = options;
  const avatarProfiles = useSyncedMap<AvatarProfile>("avatarProfiles");
  const [avatarIds, setAvatarIds] = useSyncedState<string[]>(
    "avatarIds",
    []
  );
  const [seeded, setSeeded] = useSyncedState<boolean>(
    "avatarTestSeeded",
    false
  );
  const limitedAvatarIds = capAvatarIds(avatarIds, max);

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
    const nextIds = capAvatarIds(
      [profile.id, ...avatarIds.filter((id) => id !== profile.id)],
      max
    );
    if (nextIds.join("|") !== limitedAvatarIds.join("|")) {
      setAvatarIds(nextIds);
    }
  };

  const recordInteraction = () => {
    const currentUser = figma.currentUser;
    if (!currentUser) return;
    const resolvedId = resolveUserId(
      currentUser.id ?? null,
      currentUser.sessionId ?? null,
      currentUser.name
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

  useEffect(() => {
    if (!ENABLE_TEST_AVATARS || seeded) return;
    const nextIds = [...limitedAvatarIds];
    TEST_AVATAR_NAMES.forEach((name, index) => {
      const id = `test:${index + 1}`;
      const existing = avatarProfiles.get(id);
      if (!existing) {
        avatarProfiles.set(id, {
          id,
          name,
          initials: getInitials(name),
          photoUrl: null,
          color: TEST_AVATAR_COLORS[index % TEST_AVATAR_COLORS.length],
          sessionId: null,
        });
      }
      if (!nextIds.includes(id)) {
        nextIds.push(id);
      }
    });
    if (nextIds.join("|") !== limitedAvatarIds.join("|")) {
      setAvatarIds(capAvatarIds(nextIds, max));
    }
    setSeeded(true);
  });

  // Enforce avatar cap for older synced data that may exceed the current max.
  useEffect(() => {
    const cappedAvatarIds = capAvatarIds(avatarIds, max);
    if (avatarIds.join("|") === cappedAvatarIds.join("|")) return;
    setAvatarIds(cappedAvatarIds);
  });

  const profiles = limitedAvatarIds
    .map((id) => avatarProfiles.get(id))
    .filter((profile): profile is AvatarProfile => Boolean(profile));

  const avatars: AvatarDisplay[] = profiles.map((profile) => {
    if (profile.photoUrl) {
      return {
        id: profile.id,
        name: profile.name,
        type: "image",
        src: profile.photoUrl,
      };
    }
    const fill = profile.color ?? withOpacity(accentColor, 0.2);
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

  return { avatars, recordInteraction };
}
