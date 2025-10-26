import { useParams, Link } from "react-router-dom";
import { getProgramBySlug } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgramRegistrationForm } from "@/components/ProgramRegistrationForm";
import { ArrowLeft, Check, Calendar, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = slug ? getProgramBySlug(slug) : undefined;

  if (!program) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Program Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const Icon = program.icon;

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section
          className="relative h-[60vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${program.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/20" />
          <div className="container relative z-10 mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-4 text-foreground hover:text-primary">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground">
                {program.title}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {program.description}
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Program{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Overview
                  </span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {program.overview}
                </p>
                <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {program.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-3" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-card to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Weekly{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Schedule
              </span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {program.schedule.map((day, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {day.activities.map((activity, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">
                          • {activity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Membership{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {program.pricing.map((tier, index) => (
                <Card
                  key={index}
                  className={`bg-card border-border ${
                    tier.popular ? "border-primary border-2 shadow-[var(--shadow-card)]" : ""
                  }`}
                >
                  <CardHeader>
                    {tier.popular && (
                      <Badge className="w-fit mb-2 bg-gradient-to-r from-primary to-secondary">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{tier.tier}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">
                      {tier.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /{tier.period}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-card to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Coaches
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {program.instructorInfo.map((instructor, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Users className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle>{instructor.name}</CardTitle>
                        <CardDescription>{instructor.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{instructor.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="register" className="py-20 px-4 bg-background">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Get Started?
              </span>
            </h2>
            <p className="text-muted-foreground text-center mb-12">
              Fill out the form below and we'll contact you to complete your enrollment.
            </p>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Register for {program.title}</CardTitle>
                <CardDescription>
                  Join our community and start your fitness journey today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProgramRegistrationForm program={program} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProgramDetail;
