class CategoriesController < ApplicationController

  def index
    @categories = Category.all
    render json: @categories
  end

  def create
    @category = Post.new(category_params)
    if @category.save
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  def update
    @category = Post.find(params[:id])
    @category.update_attributes(category_params)
    render json: @category
  end

  def destroy
    @category= Post.find(params[:id])
    if @category.destroy
      head :no_content, status: :ok
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  private

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
