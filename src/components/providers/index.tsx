import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "./react-query.provider";
import AuthProvider from "./auth.provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      <AuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </AuthProvider>
    </NuqsAdapter>
  );
}
