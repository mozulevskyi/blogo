module Api::V1
  class PostsController < ApplicationController
    def index
      @posts = Post.order('created_at DESC')
      render json: @posts
    end

    def create
      @post = Post.new(posts_params)
      if @post.save
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    def update
      @post = Post.find(params[:id])
      @post.update_attributes(posts_params)
      render json: @post
    end

    def destroy
      @post= Post.find(params[:id])
      if @post.destroy
        head :no_content, status: :ok
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    private

    def posts_params
      params.require(:post).permit(:name, :content)
    end
  end
end
