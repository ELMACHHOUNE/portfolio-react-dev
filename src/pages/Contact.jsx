import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { identity, socialLinks } from "@/data/social";

const initialForm = { name: "", email: "", subject: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const setField = (field) => (event) => {
    const { value } = event.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!form.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!form.message.trim()) {
      nextErrors.message = "Please write a message.";
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm(initialForm);
    }, 900);
  };

  const contactCards = [
    { icon: Mail, label: "Email", value: socialLinks.email || "—" },
    { icon: MapPin, label: "Location", value: identity.location || "—" },
  ];

  const socials = [
    { label: "LinkedIn", href: socialLinks.linkedin, Icon: IconBrandLinkedin },
    { label: "Facebook", href: socialLinks.facebook, Icon: IconBrandFacebook },
    { label: "GitHub", href: socialLinks.github, Icon: IconBrandGithub },
    { label: "WhatsApp", href: socialLinks.whatsapp, Icon: IconBrandWhatsapp },
    { label: "Instagram", href: socialLinks.instagram, Icon: IconBrandInstagram },
  ];

  return (
    <div className="pb-8">
      <PageHeader
        eyebrow="~/contact"
        title="Get in touch"
        description="Questions, collaboration ideas, or freelance projects — my inbox is open."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="leading-relaxed text-muted-foreground">
              I respond to most messages within a day or two. If you&apos;re
              writing about a project, tell me a little about the goal, the stack
              and the timeline.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactCards.map(({ icon: Icon, label, value }) => (
                <Card key={label}>
                  <CardHeader className="flex-row items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{label}</CardTitle>
                      <CardDescription>{value}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, Icon }) =>
                href ? (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    nativeButton={false}
                    render={<a href={href} target="_blank" rel="noreferrer" />}
                    aria-label={label}
                    title={label}>
                    <Icon />
                  </Button>
                ) : null,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Social links are empty placeholders — configure{" "}
              <code className="rounded bg-muted px-1">src/data/social.js</code>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>
                All fields are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={setField("name")}
                      placeholder="Your name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={setField("email")}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={setField("subject")}
                    placeholder="What is this about?"
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  />
                  {errors.subject && (
                    <p id="contact-subject-error" className="text-xs text-destructive">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={setField("message")}
                    placeholder="Tell me about your project…"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-xs text-destructive">
                      {errors.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="group">
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    {status === "sending" ? "Sending…" : "Send message"}
                  </Button>
                  {status === "success" && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm text-emerald-500",
                      )}
                      role="status">
                      <CheckCircle2 className="size-4" />
                      Message ready!
                    </span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}