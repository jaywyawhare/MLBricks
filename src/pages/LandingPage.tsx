import { 
  ArrowRight, 
  Code, 
  Blocks, 
  Brain, 
  BarChart3, 
  Sparkles, 
  Play, 
  Github, 
  Star, 
  Database, 
  Network, 
  Rocket, 
  Mouse
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <img src="/favicon.svg" alt="MLBricks" className="h-8 w-8" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">MLBricks</span>
              </a>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition">How it Works</a>
              <a href="/workspace" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition">
                Launch App
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in">
              Build ML Pipelines with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary"> Drag & Drop</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-8 animate-fade-in">
              Create, test, and deploy machine learning models without writing a single line of code. 
              Perfect for data scientists and ML engineers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <a href="/workspace" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition">
                Start Building
              </a>
              <a href="#how-it-works" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-slate-300 dark:border-slate-700 text-base font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                Learn More
              </a>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(71,85,105,0.06),transparent_70%)]"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need for ML Development
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Powerful features to streamline your machine learning workflow
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Drag & Drop Interface',
                description: 'Intuitive drag-and-drop interface for building ML pipelines with pre-built components',
                icon: '🎯'
              },
              {
                title: 'Multiple ML Tasks',
                description: 'Support for classification, regression, clustering, and neural network architectures',
                icon: '🤖'
              },
              {
                title: 'Code Generation',
                description: 'Automatically generate clean Python code for your ML pipeline',
                icon: '⚡️'
              },
              {
                title: 'Popular Frameworks',
                description: 'Integration with TensorFlow, Scikit-learn, XGBoost, and more',
                icon: '📚'
              },
              {
                title: 'Real-time Preview',
                description: 'Visualize your model architecture and data flow in real-time',
                icon: '👁️'
              },
              {
                title: 'Export & Deploy',
                description: 'Export your models and deploy them anywhere with ease',
                icon: '🚀'
              }
            ].map((feature, index) => (
              <div key={index} className="relative p-6 bg-slate-50 dark:bg-slate-800 rounded-xl hover:scale-[1.02] transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your ML Workflow?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of data scientists and ML engineers who are building better models faster with MLBricks.
          </p>
          <a
            href="/workspace"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-white hover:bg-slate-100 transition"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="hover:text-white transition">Features</a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition">How it Works</a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition">Pricing</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition">Documentation</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Tutorials</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition">About</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Contact</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Careers</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="hover:text-white transition">Privacy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">Terms</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8">
            <p className="text-center text-sm">© {new Date().getFullYear()} MLBricks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage