class Section < ApplicationRecord

	belongs_to :book
	validates_presence_of :title, :order_index
end
