class Section < ApplicationRecord

	belongs_to :book
	validates_presence_of :title, :order_index

	def page_header
		"
			<div class='pg-header'>
				<h2>#{self.title}</h2>
			</div>
		"
	end
end
