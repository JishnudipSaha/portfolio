"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import CustomCursor from "@/components/custom-cursor"
import AnimatedSection from "@/components/animated-section"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const response = await fetch('https://formspree.io/f/mvgrvazg', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      alert('Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Something went wrong. Please try again.');
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "jishnudip.saha.2004@gmail.com",
      href: "mailto:jishnudip.saha.2004@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9748612686",
      href: "tel:+919748612686",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kolkata, West Bengal, India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/JishnudipSaha",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jishnudipsaha/",
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://x.com/jishnudip?t=qWwziXWDYuFa6bYUuNMkjQ&s=08 ",
      color: "hover:text-sky-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:jishnudip.saha@example.com",
      color: "hover:text-purple-400",
    },
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      <CustomCursor />
      <Navigation />

      <div className="pt-20 px-4">
        {/* Hero Section */}
        <AnimatedSection className="max-w-6xl mx-auto py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Let's collaborate and create something amazing together
            </p>
          </div>
        </AnimatedSection>

        {/* Contact Form and Info */}
        <AnimatedSection className="max-w-6xl mx-auto py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="contact-form">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Send Me a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-white"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-white"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-white"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="bg-gray-800/50 border-gray-600 focus:border-purple-500 focus:ring-purple-500 text-white resize-none"
                      placeholder="Tell me about your project or just say hello!"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="neon-button w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="contact-info space-y-8">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">{info.label}</p>
                        <a
                          href={info.href}
                          className="text-white hover:text-purple-400 transition-colors duration-300 font-medium"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Follow Me
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-link flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 ${social.color}`}
                    >
                      <social.icon className="w-6 h-6" />
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="max-w-4xl mx-auto py-16 pb-32">
          <div className="text-center bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Ready to Start a Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new projects and collaborate with amazing people. Let's discuss how we can
              bring your ideas to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="neon-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <a href="mailto:jishnudip.saha@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Me
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="neon-button-outline border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <a href="https://www.linkedin.com/in/jishnudipsaha/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}
