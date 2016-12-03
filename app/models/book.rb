class Book < ApplicationRecord

	mount_uploader :cover, CoverUploader

	belongs_to :user
	has_many :sections
end
