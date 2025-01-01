import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BlogFormUpdateDialog from "./blog-form-update";
import BlogFormRemoveDialog from "./blog-form-remove-dialog";
import Image from "next/image";
import { format } from "date-fns";

type BlogsType = Doc<"blogs">;

const BlogCard = ({
  _creationTime,
  _id,
  authorId,
  authorName,
  content,
  name,
  image,
  imageUrl,
  updatedAt,
}: BlogsType) => {
  const formattedCreationTime = format(new Date(_creationTime), "PPpp");
  const formattedUpdatedAt = updatedAt
    ? format(new Date(updatedAt), "PPpp")
    : null;

  return (
    <Card
      key={`${authorId} ${_id} ${image}`}
      className="max-w-2xl mx-auto my-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <CardContent className="p-0">
        {imageUrl && (
          <div className="relative h-64 w-full">
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        )}
      </CardContent>
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          {name}
        </CardTitle>
        <CardDescription className="space-y-4">
          <div id="content" className="text-gray-700">
            {content}
          </div>
          <div
            id="blog-details"
            className="flex justify-between items-center mt-4"
          >
            <span
              id="authorName"
              className="text-sm font-semibold text-gray-600"
            >
              By {authorName}
            </span>
            <div id="date-details" className="text-sm text-gray-500">
              <span>Created: {formattedCreationTime}</span>
              {formattedUpdatedAt && (
                <span> | Updated: {formattedUpdatedAt}</span>
              )}
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <BlogFormUpdateDialog blogId={_id} />
            <BlogFormRemoveDialog blogId={_id} />
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default BlogCard;
