import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from "./Select";


function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        tags: [],
        slug: post?.slug || "",
        featuredImage: post?.featuredImage || "",
        status: post?.status || "active",
        name : post?.status || "Anonymous",
        category : post?.category || "Technology"
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const categories = [
    'Technology',
    'Health',
    'Education',
    'Travel',
    'Finance',
    'Food',
    'Lifestyle',
    'Coding',
  ];

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        await service.deletefile(post.featuredImage);
      }

      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image?.[0]
        ? await service.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;


        if (!userData?.$id) {
      console.error("User is not logged in.");
      return;
    }


        const newPost = await service.createPost({
          ...data,
          userId: userData.$id,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    return value
      .trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return(
    <>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap -mx-2">
      {/* Left section */}
      <div className="w-full md:w-2/3 px-2 mb-6 mx-auto">
    <h2 className="text-2xl font-[Inter] font-semibold mb-5 tracking-tighter "> Add Your Post Here :  </h2>
        <Input
          label="Title:"
          placeholder="Post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Post slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content:"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />



        <Input
          label="Featured Image:"
          type="file"
          accept="image/*"
          className="mb-4"
          {...register("image", { required: !post })}
        />
        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg object-cover w-full max-h-48"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status:"
          className="mb-4"
          {...register("status", { required: true })}
        />
          <Input
          label="Posted By "
          placeholder="Your name"
          className="mb-4"
          {...register("name", { required: true })}

        />
      <div className="px-4 mb-6">
  <label className="block mb-1 text-sm font-medium text-gray-700">Category:</label>
  <select
    {...register("category", { required: true })}
    className="w-full sm:w-60 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors duration-300"
  >
    <option value="">-- Select Category --</option>
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-rose-500"}
          className="w-full text-white rounded-lg py-2"
        >
          {post ? "Update Post" : "Create Post"}
        </Button>
    </div>
    </form>
    </>
  )
}

export default PostForm;
