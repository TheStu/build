Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  root 'statics#index'
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  get 'about', to: 'statics#about'
  get 'contact', to: 'statics#contact'

  devise_for :users
  
  # BOOKS
  resources :sections, only: [:create, :update, :destroy] do
    patch 'change_index', on: :member
  end
  resources :books, only: [:new, :update, :destroy] do
  	get 'editor', on: :member
    get 'delete-cover', on: :member
  end
end
