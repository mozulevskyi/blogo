module Api::V1
  class PostsController < ApplicationController
    def index
      @posts = Post.order('created_at DESC')
      render json: @posts
    end

    def create
      @post = Post.create(posts_params)
      render json: @post
    end

    def update
      current_post.update(posts_params)
      render json: current_post
    end

    def destroy
      current_post.destroy
      redirect_to posts_path
    end

    private

    def current_post
      @post = Post.find(params[:id])
    end

    def posts_params
      params.require(:post).permit(:name, :content)
    end
  end
end
