"use client"

import { FormEvent, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
// import { Upload } from 'lucide-react'
import { register } from "@/app/actions/register"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry",
]

export default function Register() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData(formRef.current!)

    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    const response = await register({
      email: formData.get("email") as string,
      password: password,
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      aadhar: formData.get("aadhar") as string,
      role: formData.get("role") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
    })

    if (response?.error) {
      setError(response.error)
      setSuccess(null)
    } else {
      setError(null)
      setSuccess(true)
      formRef.current?.reset()
      setTimeout(() => router.push("/login"), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 -z-10">
          {/* <img
            src="/farm-background.jpg"
            alt="Farm landscape"
            className="w-full h-full object-cover"
          /> */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container grid lg:grid-cols-2 gap-12 py-12">
          <div className="flex flex-col justify-center text-white">
            <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Registration Form</h1>
            <p className="text-xl mb-8 drop-shadow">Register yourself as a farmer/buyer.</p>
          </div>

          <div className="bg-white/95 p-8 rounded-lg shadow-lg backdrop-blur-sm max-w-md w-full mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 rounded-md">
                  {error}
                </div>
              )}
              {success && (
                <div className="p-3 text-sm text-green-500 bg-green-100 rounded-md">
                  Registration successful! Redirecting...
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Phone"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="aadhar" className="text-sm font-medium">
                  Aadhar Number
                </label>
                <input
                  id="aadhar"
                  name="aadhar"
                  maxLength={12}
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Aadhar Number"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Role"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="city" className="text-sm font-medium">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    className="w-full p-3 rounded-md border bg-white/50"
                    placeholder="City"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="state" className="text-sm font-medium">
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    className="w-full p-3 rounded-md border bg-white/50"
                  >
                    <option value="">Select state</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="pincode" className="text-sm font-medium">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Pincode"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Password"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full p-3 rounded-md border bg-white/50"
                  placeholder="Confirm Password"
                />
              </div>

              {/* <div className="space-y-2">
                <label className="text-sm font-medium">
                  Supporting Documents
                </label>
                <div className="border-2 border-dashed rounded-md p-4 text-center">
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    className="hidden"
                    multiple
                  />
                  <label
                    htmlFor="documents"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    <span className="text-sm text-muted-foreground">
                      Upload Documents
                    </span>
                  </label>
                </div>
              </div> */}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-black/90 transition-colors"
              >
                Register
              </button>

              <div className="text-center text-sm">
                <Link href="/login" className="text-blue-500 hover:text-blue-700">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

