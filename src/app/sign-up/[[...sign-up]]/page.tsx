import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8B0000]/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1E3A8A]/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center px-4">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B0000] to-[#A52020] flex items-center justify-center">
              <span className="text-white font-black text-sm">A</span>
            </div>
            <span className="text-white font-black text-xl tracking-tight">Apex Circuit</span>
          </div>
          <p className="text-gray-500 text-sm">Admin Access</p>
          <p className="text-xs text-gray-600 mt-1">Note: access requires prior authorisation.</p>
        </div>

        <SignUp
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "#8B0000",
              colorBackground: "#13131E",
              borderRadius: "0.75rem",
            },
          }}
        />
      </div>
    </div>
  );
}
