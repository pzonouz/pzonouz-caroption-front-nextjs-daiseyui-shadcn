import ChangePassword from "@/app/components/Auth/ChangePassword";

export default async function page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ChangePassword token={token} />;
}
