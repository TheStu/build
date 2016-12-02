Rails.application.routes.draw do

  root 'statics#index'

  get 'about', to: 'statics#about'
  get 'contact', to: 'statics#contact'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  
  # BOOKS
  resources :sections, only: [:create, :update, :destroy] do
    patch 'change_index', on: :member
  end
  resources :books, only: [:new, :update, :destroy] do
  	get 'editor', on: :member
  end
end
