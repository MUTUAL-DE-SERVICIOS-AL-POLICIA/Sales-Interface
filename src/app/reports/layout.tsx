export const dynamic = "force-dynamic";

import { getForGenerateReport } from "@/api";
import { ReportsProvider } from "@/context";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getForGenerateReport();

  return (
    <div className="ml-2 mr-2 my-2">
      <ReportsProvider groups={data}>
        <section className="flex justify-center md:flex-row flex-wrap gap-1 h-[calc(100vh-135px)]">
          {children}
        </section>
      </ReportsProvider>
    </div>
  );
}
