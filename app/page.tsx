import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Shorten Any URL",
    description:
      "Paste any long URL and get a clean, compact short link in seconds. Share it anywhere without cluttering your message.",
    icon: "✂️",
  },
  {
    title: "Track Every Click",
    description:
      "See exactly how many times your links are clicked with real-time analytics. Understand your audience and measure reach.",
    icon: "📊",
  },
  {
    title: "Manage Your Links",
    description:
      "All your shortened links in one dashboard. Edit, disable, or delete them at any time with full control.",
    icon: "🗂️",
  },
  {
    title: "Secure & Reliable",
    description:
      "Links are stored safely and served with high availability. Your short URLs will always redirect correctly.",
    icon: "🔒",
  },
];

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <Badge variant="secondary" className="mb-6 text-sm">
          Free URL Shortener
        </Badge>
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Short links. Big impact.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          LinkShort turns your long, unwieldy URLs into clean, shareable links —
          with click tracking and a dashboard to manage them all.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg" className="rounded-full px-8">
              Get Started Free
            </Button>
          </SignUpButton>
          <a href="#features">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              See Features
            </Button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="px-6 pb-24 max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Everything you need
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            A simple, powerful set of tools to shorten, share, and track your links.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="border border-zinc-200 dark:border-zinc-800 shadow-none">
              <CardHeader>
                <div className="text-3xl mb-2">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Start shortening links today
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          Create your free account and start sharing cleaner, smarter links in under a minute.
        </p>
        <div className="mt-8">
          <SignUpButton mode="modal">
            <Button size="lg" className="rounded-full px-10">
              Create Free Account
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 px-6 py-8 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} LinkShort. All rights reserved.
      </footer>
    </div>
  );
}

