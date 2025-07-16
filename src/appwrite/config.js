import conf from "../conf/conf";
import { Client , Account , ID , Databases , Storage , Query } from "appwrite";


export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }


 async createPost({ title, slug, content, featuredImage, status, userId, name , category  }) {
  try {
    return await this.databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug, // Used as document ID

      {
        title,
        content,
        featuredImage,
        status,
        userId,
        slug,
        name,
        category

      }
    );
  } catch (error) {
    console.log("Appwrite Service :: CreatePost :: ", error);
    return { error: "Failed to create post. Please try again." };
  }
}


  async updatePost( slug , {title , content , featuredImage , status }){
    try{
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    }
    catch(error){
      console.log("Appwrite Service :: UpdatePost :: " , error);
      return false;
    }
  }
   async deletePost( slug ){
    try{
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true;
    }
    catch(error){
      console.log("Appwrite Service :: deletePost :: " , error);
      return false;
    }
  }
 async getPost(slug , name , featuredImage) {
  try {
    const response = await this.databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug, // slug == document ID
      name,
      featuredImage,
    );
    return response;
  } catch (error) {
    console.log("Appwrite Service :: getPost ::", error);
    return null;
  }
}


  async getPosts(queries = [Query.equal("status" , "active")]) {
    try {
      const posts = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      )
      return posts;
    }
    catch(error) {
      console.log("Appwrite Service :: getPosts :: " , error);
      return false;
    }

  }

  async uploadFile(file) {
    try{
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    }
    catch(error) {
      console.log("Appwrite Service :: uploadFile :: " , error);
      return false;
    }
  }

  async deletefile(fileId) {
    try{
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true;
    }
    catch(error) {
      console.log("Appwrite Service :: deleteFile :: " , error);
      return false;
    }
  }

   getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()
export default service