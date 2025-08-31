import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <SignUp />
    </div>
  );
}