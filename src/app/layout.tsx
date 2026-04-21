import "./globals.css";
import { Toaster } from "sonner";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-poppins antialiased">
        {children}
        <Toaster
          position="bottom-right"
          expand={true}
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#000000",
              border: "1px solid #e5e7eb",
              width: "360px",
            },
          }}
        />
      </body>
    </html>
  );
};
export default RootLayout;
