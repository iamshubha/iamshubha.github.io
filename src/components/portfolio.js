import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, Trophy, BookOpen, Code, Server, Database, Shield } from 'lucide-react';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Shubha Banerjee</h1>
          <h2 className="text-2xl mb-6">Blockchain & Backend Engineering Leader</h2>
          <p className="text-xl mb-8">Architecting Decentralized Solutions & Scalable Systems</p>
          <div className="flex gap-4">
            <a href="mailto:shubhabanerjeewin8@gmail.com" className="flex items-center gap-2 hover:text-blue-200">
              <Mail size={20} /> Contact
            </a>
            <a href="https://github.com/iamshubha" className="flex items-center gap-2 hover:text-blue-200">
              <Github size={20} /> GitHub
            </a>
            <a href="https://linkedin.com/in/" className="flex items-center gap-2 hover:text-blue-200">
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Technical Expertise */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Technical Expertise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-blue-600 w-6 h-6" />
                <h3 className="text-xl font-semibold text-blue-700">Core Technologies</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Solidity & Smart Contracts</li>
                <li>• Rust, Go, TypeScript</li>
                <li>• Web3.js & Ethers.js</li>
                <li>• GraphQL & REST APIs</li>
                <li>• IPFS & Distributed Storage</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-blue-600 w-6 h-6" />
                <h3 className="text-xl font-semibold text-blue-700">Infrastructure</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• AWS, GCP, Azure</li>
                <li>• Docker & Kubernetes</li>
                <li>• PostgreSQL, MongoDB</li>
                <li>• Kafka & RabbitMQ</li>
                <li>• Redis & Caching Solutions</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-blue-600 w-6 h-6" />
                <h3 className="text-xl font-semibold text-blue-700">Security & DevOps</h3>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Smart Contract Auditing</li>
                <li>• GitHub Actions & Jenkins</li>
                <li>• Grafana & Elasticsearch</li>
                <li>• SonarQube & Blackduck</li>
                <li>• Security Best Practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Blockchain Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Decentralized Governance Platform</h3>
              <div className="text-gray-600 space-y-4">
                <p className="font-medium">Blockchain-based platform for transparent decision-making</p>
                <ul className="space-y-2">
                  <li>• Developed Rust-based smart contracts for voting and proposal management</li>
                  <li>• Implemented multi-stakeholder consensus mechanisms</li>
                  <li>• Built intuitive user interface for proposal submission and voting</li>
                  <li>• Integrated off-chain data feeds for real-time updates</li>
                </ul>
                <div className="flex gap-4 text-blue-600 mt-4">
                  <Trophy className="w-5 h-5" />
                  <span>60% increase in community engagement | 40% faster decision-making</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Decentralized Finance Protocol</h3>
              <div className="text-gray-600 space-y-4">
                <p className="font-medium">A comprehensive DeFi platform enabling lending, borrowing, and yield farming</p>
                <ul className="space-y-2">
                  <li>• Implemented smart contracts for lending pools with dynamic interest rate models</li>
                  <li>• Developed automated liquidation mechanisms using price oracles</li>
                  <li>• Integrated yield farming strategies with compound interest calculations</li>
                  <li>• Built security features including emergency stops and access controls</li>
                </ul>
                <div className="flex gap-4 text-blue-600 mt-4">
                  <Trophy className="w-5 h-5" />
                  <span>45% increase in protocol efficiency | $5M+ Total Value Locked</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Decentralized Storage Solution</h3>
              <div className="text-gray-600 space-y-4">
                <p className="font-medium">Enterprise-grade distributed storage platform using Storj</p>
                <ul className="space-y-2">
                  <li>• Developed encryption and access control mechanisms</li>
                  <li>• Implemented fault-tolerant data distribution system</li>
                  <li>• Created smart contracts for storage incentivization</li>
                  <li>• Built monitoring and data integrity verification system</li>
                </ul>
                <div className="flex gap-4 text-blue-600 mt-4">
                  <Trophy className="w-5 h-5" />
                  <span>40% improvement in data retrieval speed | 99.99% uptime</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Supply Chain Tracking System</h3>
              <div className="text-gray-600 space-y-4">
                <p className="font-medium">Blockchain-based supply chain verification platform</p>
                <ul className="space-y-2">
                  <li>• Smart contracts for product tracking and verification</li>
                  <li>• QR code integration for product authentication</li>
                  <li>• Real-time tracking and status updates</li>
                  <li>• Multi-party consensus mechanism for verification</li>
                </ul>
                <div className="flex gap-4 text-blue-600 mt-4">
                  <Trophy className="w-5 h-5" />
                  <span>50% reduction in verification time | 30% cost savings</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Professional Experience</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Senior Consultant - Blockchain & Backend</h3>
              <p className="text-gray-600 mb-4">Mercedes Benz, Bangalore | Oct 2023 - Present</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Developed scalable microservices using Rust, Go and Kafka, improving system efficiency by 30%</li>
                <li>• Enhanced S3-compatible storage integration with 30% better data efficiency</li>
                <li>• Implemented secure CI/CD pipelines reducing deployment time by 50%</li>
                <li>• Optimized backend services with Go and Redis, boosting performance by 25%</li>
                <li>• Strengthened security protocols, reducing vulnerabilities by 50%</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Backend Developer</h3>
              <p className="text-gray-600 mb-4">HDFC Bank, Bangalore | Aug 2022 - Sep 2023</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Developed blockchain-based Debit Card service improving reliability by 40%</li>
                <li>• Integrated Core Banking APIs with external services reducing processing time by 25%</li>
                <li>• Implemented smart contracts for transaction verification and fraud prevention</li>
                <li>• Deployed services using Kubernetes, reducing deployment times by 50%</li>
                <li>• Conducted security audits with SonarCloud, reducing incidents by 30%</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Golang Developer</h3>
              <p className="text-gray-600 mb-4">Logicloop, Remote | Feb 2022 - Aug 2022</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Migrated backend services to Go, improving performance by 60%</li>
                <li>• Implemented blockchain-based authentication system</li>
                <li>• Set up observability with Grafana, reducing MTTD by 20%</li>
                <li>• Automated CI/CD pipelines, increasing deployment frequency by 15%</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Full Stack Developer</h3>
              <p className="text-gray-600 mb-4">CBNITS, Kolkata | Feb 2021 - Feb 2022</p>
              <ul className="space-y-2 text-gray-600">
                <li>• Built eZTrade with blockchain integration for secure trading</li>
                <li>• Developed eZConsult using Go, GraphQL, and Flutter</li>
                <li>• Created REST APIs with Gin framework, reducing response time by 30%</li>
                <li>• Implemented smart contract-based payment system</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Education</h3>
              <p className="text-gray-600 font-medium">Computer Science & Technology</p>
              <p className="text-gray-600">Bipradas Pal Chowdhury Institute of Technology</p>
              <p className="text-gray-600">2019 - 2021</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Certifications & Achievements</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• AWS Certified Solutions Architect (pursuing)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2024 Shubha Banerjee. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;