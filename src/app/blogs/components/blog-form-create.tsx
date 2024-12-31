import React, { useState } from "react";
import { UseCreateBlogHook } from "../hooks/blog-create-hook";
import {
  BlogSchemaZodType,
  BlogZodValidation,
} from "../contants/blog-constants";
import { Form } from "@/components/ui/form";
import CustomInput from "@/_page_components/form/custom-input";
import CustomTextarea from "@/_page_components/form/custom-textarea";
import SubmitLoader from "@/_page_components/loaders/submit-loader";
import { LoaderIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BlogFormCreate = () => {
  const { mutate: createBlog, isPending: creatingBlog } = UseCreateBlogHook();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { form } = BlogZodValidation();
  const { toast } = useToast();
  const handleCreateBlog = (formValues: BlogSchemaZodType) => {
    createBlog(formValues, {
      onSuccess: (data) => {
        console.log(data);
        form.reset();
        toast({
          variant: "default",
          title: "Blog Created Successfully",
        });
      },
      onError: (error) => {
        setErrorMsg(error.message);
        console.log(error);
      },
      onSettled: () => {
        console.log("Settled");
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateBlog)}>
        <CustomInput
          control={form.control}
          name="name"
          label="Blog Name"
          placeholder="Enter Blog Name"
        />
        <CustomTextarea
          control={form.control}
          name="content"
          label="Blog Name"
          placeholder="Enter Blog Name"
        />
        <CustomInput
          control={form.control}
          name="imageUrl"
          label="Blog Name"
          placeholder="Enter Blog Name"
        />
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <SubmitLoader
          defaultText="Create Blog"
          loadingText="Creating Blog"
          loadingState={creatingBlog}
          loadingIcon={LoaderIcon}
        />
      </form>
    </Form>
  );
};

export default BlogFormCreate;
