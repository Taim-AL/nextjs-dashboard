import { AuthProvider } from "./context/auth-context";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
