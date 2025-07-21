import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  BookText,
  AlignLeft,
  ListOrdered,
  Tag,
  BarChart3,
  Video,
} from "lucide-react";

const AddNewCourseDialog = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        noOfchapter: "1",
        difficultyLevel: "beginner",
        category: "",
        includeVideo: false,

    });

    const onHandleInputChange = (field, value) => {
        setFormData(prev=>({
            ...prev,
            [field]: value

        }))

        console.log("Form Data: ", formData);
    }

    const onGenerate =()=>{
        console.log(formData);
    }


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 shadow-2xl rounded-lg">
        <DialogHeader className="p-6 text-center bg-gray-50 dark:bg-gray-800/50 rounded-t-lg">
          <div className="flex justify-center items-center mb-2">
            <Sparkles className="h-8 w-8 text-violet-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Create a New Course with AI
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 mt-1">
            Fill in the details below and let AI craft your course structure.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Course Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Name
            </label>
            <div className="relative flex items-center">
              <BookText className="absolute left-3 w-5 h-5 text-gray-400" />
              <Input
                className="pl-10 h-10 border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500"
                placeholder="e.g., 'Introduction to Quantum Computing'"
                onChange={(event) => onHandleInputChange("courseName", event?.target.value)}
              />
            </div>
          </div>

          {/* Course Description Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Course Description (Optional)
            </label>
            <div className="relative flex items-center">
              <AlignLeft className="absolute left-3 w-5 h-5 text-gray-400" />
              <Input
                className="pl-10 h-10 border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500"
                placeholder="A brief summary of what the course is about"
                onChange={(event) => onHandleInputChange("Description", event?.target.value)}
              />
            </div>
          </div>

          {/* Chapters and Difficulty Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Chapters
              </label>
              <div className="relative flex items-center">
                <ListOrdered className="absolute left-3 w-5 h-5 text-gray-400" />
                <Input
                  className="pl-10 h-10 border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="e.g., 10"
                  type="number"
                  onChange={(event) => onHandleInputChange("noOfchapter", event?.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Difficulty Level
              </label>
               <div className="relative flex items-center">
                 <BarChart3 className="absolute left-3 z-10 w-5 h-5 text-gray-400" />
                <Select onValueChange={(value) => onHandleInputChange("difficultyLevel", value)}>
                  <SelectTrigger className="w-full h-10 pl-10 border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Category Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <div className="relative flex items-center">
              <Tag className="absolute left-3 w-5 h-5 text-gray-400" />
              <Input
                className="pl-10 h-10 border-gray-300 dark:border-gray-700 focus:ring-violet-500 focus:border-violet-500"
                placeholder="e.g., 'Tech, Science, AI'"

                onChange={(event) => onHandleInputChange("category", event?.target.value)}
              />
            </div>
          </div>

          {/* Include Video Switch */}
          <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-violet-500"/>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Include Video Content
              </label>
            </div>
            <Switch onCheckedChange={ ()=>onHandleInputChange('includeVideo', !formData?.includeVideo)} />
          </div>

          {/* Generate Button */}
          <div className="pt-4">
            <Button
              className={
                "w-full h-12 text-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
              }

                onClick={onGenerate}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Course
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewCourseDialog;