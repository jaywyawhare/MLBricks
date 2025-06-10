import { 
  Code, 
  Blocks, 
  Brain, 
  BarChart3, 
  Sparkles
} from 'lucide-react'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <img src="/favicon.svg" alt="MLBricks" className="h-7 w-7" />
            <span className="font-bold text-xl tracking-tight">MLBricks</span>
          </a>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/jaywyawhare/MLBricks" 
              className="inline-flex h-10 items-center justify-center rounded-full border border-border px-6 py-2 text-sm font-medium transition-all hover:bg-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a 
              href="/workspace" 
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 hover:scale-105"
            >
              Playground
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container relative pt-32 pb-24">
        <div className="mx-auto max-w-[980px] text-center">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Open Source & Ready to Use
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl mb-6">
            Learn ML Your Way{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Visually
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[750px] mx-auto mb-12">
            Break down complex ML concepts into visual, interactive blocks. 
            Build real models, experiment with data, and learn by doing.
          </p>
          <div className="flex justify-center gap-4 items-center">
            <a 
              href="/workspace" 
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25 hover:scale-105"
            >
              Try Playground
            </a>
            <a 
              href="https://github.com/jaywyawhare/MLBricks" 
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-8 py-2 text-sm font-medium transition-all hover:bg-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-24 border-t border-border/40">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Learn ML Your Way
            </h2>
            <p className="text-muted-foreground text-lg">
              From basic data processing to advanced neural networks
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-2xl border border-border bg-background/50 p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-primary/50 backdrop-blur">
              <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Visual Learning</h3>
              <p className="text-muted-foreground">
                Learn ML concepts through interactive visual blocks
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-background/50 p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-primary/50 backdrop-blur">
              <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Hands-on Practice</h3>
              <p className="text-muted-foreground">
                Build real ML models as you learn
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-background/50 p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-primary/50 backdrop-blur">
              <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20">
                <Blocks className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Step by Step</h3>
              <p className="text-muted-foreground">
                Progress from basics to deep learning
              </p>
            </div>

            <div className="group rounded-2xl border border-border bg-background/50 p-6 transition-all hover:shadow-xl hover:scale-105 hover:border-primary/50 backdrop-blur">
              <div className="mb-4 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">Real Results</h3>
              <p className="text-muted-foreground">
                Visualize and understand your models
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block Library Preview */}
      <section className="border-t border-border/40 bg-accent/50">
        <div className="container py-24">
          <div className="mx-auto max-w-[980px] text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              ML Building Blocks
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-[600px] mx-auto">
              From data preprocessing to deep learning, our visual blocks help you understand and implement ML concepts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur hover:scale-105 transition-all">
                <h3 className="font-semibold mb-2">Data Processing</h3>
                <p className="text-sm text-muted-foreground">Clean and prepare your data</p>
              </div>
              <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur hover:scale-105 transition-all">
                <h3 className="font-semibold mb-2">Classification</h3>
                <p className="text-sm text-muted-foreground">Learn supervised learning</p>
              </div>
              <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur hover:scale-105 transition-all">
                <h3 className="font-semibold mb-2">Neural Networks</h3>
                <p className="text-sm text-muted-foreground">Build deep learning models</p>
              </div>
              <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur hover:scale-105 transition-all">
                <h3 className="font-semibold mb-2">Evaluation</h3>
                <p className="text-sm text-muted-foreground">Measure model performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-accent/50">
        <div className="container py-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} MLBricks. Built for ML enthusiasts with ♥️
            </p>
            <div className="flex items-center gap-6">
              <a href="https://github.com/jaywyawhare/MLBricks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
              <a href="/workspace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Playground</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage