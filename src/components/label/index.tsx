export function Label({ displayName }: { displayName: string }) {
  return (
    <label className="text-white font-medium mt-1 mb-1">{displayName}</label>
  );
}
