"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Loader2 } from "lucide-react"

interface ScanStep {
  id: string
  title: string
  description: string
  status: "pending" | "scanning" | "complete"
  progress: number
}

interface ScanProgressProps {
  isScanning: boolean
  onComplete: () => void
}

export function ScanProgress({ isScanning, onComplete }: ScanProgressProps) {
  const [overallProgress, setOverallProgress] = useState(0)
  const [steps, setSteps] = useState<ScanStep[]>([
    {
      id: "connect",
      title: "Connecting to Store",
      description: "Establishing secure connection",
      status: "pending",
      progress: 0,
    },
    {
      id: "privacy",
      title: "Scanning Privacy Policy",
      description: "Analyzing GDPR and CCPA compliance",
      status: "pending",
      progress: 0,
    },
    {
      id: "cookies",
      title: "Checking Cookie Consent",
      description: "Verifying cookie banner implementation",
      status: "pending",
      progress: 0,
    },
    {
      id: "terms",
      title: "Reviewing Terms of Service",
      description: "Checking legal compliance requirements",
      status: "pending",
      progress: 0,
    },
    {
      id: "analysis",
      title: "AI Analysis",
      description: "Generating compliance recommendations",
      status: "pending",
      progress: 0,
    },
  ])
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isScanning) {
      setOverallProgress(0)
      setSteps(steps.map((step) => ({ ...step, status: "pending", progress: 0 })))
      setCurrentStepIndex(0)
      return
    }

    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps]
        if (currentStepIndex >= newSteps.length) {
        clearInterval(interval)
        setOverallProgress(100)
        setTimeout(() => {
          onComplete()
        }, 1000)
          return newSteps
      }
        // Update current step
        if (newSteps[currentStepIndex] && newSteps[currentStepIndex].progress < 100) {
          newSteps[currentStepIndex].status = "scanning"
          newSteps[currentStepIndex].progress += Math.random() * 15 + 5
          if (newSteps[currentStepIndex].progress >= 100) {
            newSteps[currentStepIndex].progress = 100
            newSteps[currentStepIndex].status = "complete"
            setCurrentStepIndex((idx) => idx + 1)
          }
        }
        return newSteps
      })
      // Update overall progress
      setSteps((stepsForProgress) => {
        const completedSteps = stepsForProgress.filter((step) => step.status === "complete").length
        const currentStepProgress = stepsForProgress[currentStepIndex]?.progress || 0
        const newOverallProgress = (completedSteps * 100 + currentStepProgress) / stepsForProgress.length
      setOverallProgress(Math.min(newOverallProgress, 100))
        return stepsForProgress
      })
    }, 300)
    return () => clearInterval(interval)
  }, [isScanning, onComplete, currentStepIndex])

  if (!isScanning) return null

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Scanning Progress</h3>
          <span className="text-sm font-medium text-slate-600">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      {/* Step Progress */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex-shrink-0">
              {step.status === "complete" && <CheckCircle className="h-5 w-5 text-green-600" />}
              {step.status === "scanning" && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
              {step.status === "pending" && <Clock className="h-5 w-5 text-slate-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-slate-900">{step.title}</p>
                <Badge
                  variant={
                    step.status === "complete" ? "default" : step.status === "scanning" ? "secondary" : "outline"
                  }
                  className={
                    step.status === "complete"
                      ? "bg-green-100 text-green-800"
                      : step.status === "scanning"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-600"
                  }
                >
                  {step.status === "complete" ? "Complete" : step.status === "scanning" ? "Scanning" : "Pending"}
                </Badge>
              </div>
              <p className="text-xs text-slate-600 mb-2">{step.description}</p>
              {step.status !== "pending" && <Progress value={step.progress} className="h-1" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
