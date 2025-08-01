// 共通関数(UI用)
export function getValueByPath(obj, path) {
  return path.split(".").reduce((acc, part) => {
    if (!acc) return null;
    if (Array.isArray(acc)) {
      // `part` が配列インデックスなら数値に変換
      const index = Number(part);
      return isNaN(index) ? null : acc[index];
    }
    return acc[part];
  }, obj);
}
