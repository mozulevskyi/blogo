Rails.application.routes.draw do

  resources :categories do
    resources :posts do
      resources :comments
    end
  end
end
