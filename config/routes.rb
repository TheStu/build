Rails.application.routes.draw do

  root 'statics#index'

  get 'about', to: 'statics#about'
  get 'contact', to: 'statics#contact'

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  
  # BOOKS
  resources :books, only: :new do
  	get 'editor', on: :member
  end
end
