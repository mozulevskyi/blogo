class CommentsController < ApplicationController

  def index
    @comments = current_post.comments.all
    render json: @comments
  end

  def create
    @comment = @post.comments.create!(comments_params)
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    @post = current_post
    current_comment.update_attributes(comments_params)
    render json: @comment
  end

  def destroy
    if current_comment.destroy
      head :no_content, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  private

  def current_comment
    @comment ||= Comment.find(params[:id])
  end

  def current_post
    @post ||= Post.find(params[:post_id])
  end

  def comments_params
    params.require(:comment).permit(:author, :content)
  end
end
