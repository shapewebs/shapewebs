import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md">
        <h1 className="typography__heading1__T3m8s mb-4">
          The page you're looking for can't be found
        </h1>
        <p className="typography__body__K4n7p mb-8">
          The page may have been moved or deleted. Try going back to the homepage or exploring our other sections.
        </p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </main>
  );
}
