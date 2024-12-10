import "@/app/globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[100vh] flex flex-col gap-12 items-center justify-center">
      {children}
    </div>
  );
}
