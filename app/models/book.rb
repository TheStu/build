class Book < ApplicationRecord

	mount_uploader :cover, CoverUploader
	mount_uploader :generic_epub, GenericEpubUploader

	belongs_to :user
	has_many :sections

	def build_xhtml_files
		self.sections.each do |section| # delete this file, if present, before building again ?
			File.open("tmp/#{section.title}_#{section.id}.xhtml", "w+") do |f|
				f << section.body
			end
		end
	end

	def build_epub_file # cover, css, images, ?
		book_self = self
	  epub = EeePub.make do
	    title       book_self.title
	    creator     book_self.author
	    publisher   book_self.publisher
	    date        book_self.published_at
	    uid         'BookId'
	    identifier  'http://example.com/book/foo', :scheme => 'URL', :id => 'BookId'
	
	    files book_self.sections.map {|s| "tmp/#{s.title}_#{s.id}.xhtml" }
	    nav book_self.sections.map {|s| { label: s.title, content: "#{s.title}_#{s.id}.xhtml" }}
	  end
	  epub.save("tmp/book_#{book_self.id}.epub")
	end

	def upload_epub_file
		book_self = self
		File.open("tmp/book_#{self.id}.epub") do |f|
			book_self.generic_epub = f
		end
		self.save!
	end
end
