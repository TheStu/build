class Image < ApplicationRecord
	
	mount_uploader :image, ImageUploader # images that go inside the book content

	belongs_to :book

	validates_presence_of :book_id, :image
end
