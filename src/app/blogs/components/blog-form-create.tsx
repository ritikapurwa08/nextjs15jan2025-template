import React, { useState } from "react";
import { UseCreateBlogHook } from "../hooks/blog-create-hook";
import {
  BlogSchemaZodType,
  BlogZodValidation,
} from "../contants/blog-constants";
import { Form } from "@/components/ui/form";
import CustomInput from "@/_page_components/form/custom-input";
import CustomTextarea from "@/_page_components/form/custom-textarea";
import { useToast } from "@/hooks/use-toast";
import CustomUrlInput from "@/_page_components/form/custom-image-url-checker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react"; // Icon for the dialog trigger

interface BlogCreateFormProps {
  minWidth?: boolean;
}

const BlogFormCreate = ({ minWidth }: BlogCreateFormProps) => {
  const { mutate: createBlog, isPending: creatingBlog } = UseCreateBlogHook();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { form } = BlogZodValidation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateBlog = async (formValues: BlogSchemaZodType) => {
    try {
      setErrorMsg(null);
      await createBlog(formValues, {
        onSuccess: (data) => {
          console.log(data);
          form.reset();
          toast({
            variant: "default",
            title: "Blog Created Successfully",
          });
          setIsDialogOpen(false); // Close the dialog after successful submission
        },
        onError: (error) => {
          setErrorMsg(error.message);
          console.error("Blog creation failed:", error);
        },
        onSettled: () => {
          console.log("Form submission settled");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMsg("An unexpected error occurred");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Dialog Trigger */}
      {minWidth ? (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="  rounded-full p-2 "
            aria-label="Create Blog"
            size="icon"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
            size="default"
            className="w-full transition-all duration-200 ease-in-out"
            aria-label="Create Blog"
          >
            Create Blog
          </Button>
        </DialogTrigger>
      )}

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Blog</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateBlog)}
            className="space-y-4"
          >
            <CustomInput
              control={form.control}
              name="name"
              label="Blog Name"
              placeholder="Enter Blog Name"
            />
            <CustomTextarea
              control={form.control}
              name="content"
              label="Blog Content"
              placeholder="Enter Blog Content"
            />
            <CustomUrlInput
              control={form.control}
              name="imageUrl"
              label="Image URL"
              placeholder="Enter image URL"
              validateImage={true}
              setFormError={form.setError}
            />

            {errorMsg && (
              <p className="text-sm text-red-500 mt-2">{errorMsg}</p>
            )}

            <Button
              disabled={!form.formState.isValid || creatingBlog}
              type="submit"
              className="w-full"
            >
              {creatingBlog ? (
                <span className="flex items-center gap-2">
                  Creating...
                  <span className="animate-spin">⏳</span>
                </span>
              ) : (
                "Create Blog"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogFormCreate;
