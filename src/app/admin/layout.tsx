import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-72 flex-1 flex flex-col h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white">
            {children}
        </main>
      </div>
    </div>
  );
}
