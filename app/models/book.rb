class Book < ApplicationRecord

	mount_uploader :cover, CoverUploader
	mount_uploader :generic_epub, GenericEpubUploader

	belongs_to :user
	has_many :sections
	has_many :images

  def build_css_files
    css = File.read('app/assets/stylesheets/ebook_formats/kdp.css')
    File.open('tmp/kdp.css', 'w+') do |f|
      f << css.gsub('.pg-text-area ', '')
    end
  end

  def copy_cover_file
    IO.copy_stream(open(self.cover.url), "tmp/book_#{self.id}_cover.jpg")
  end

	def build_epub_file # cover, images, ?... copy to tmp, then include in epub ?

    # https://github.com/skoji/gepub/blob/master/examples/generate_example.rb

    book = GEPUB::Book.new
    book.language = 'en'
    book.set_main_id 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
    book.add_title self.title
    book.add_creator self.author
    # book.add_date '2012-02-29T00:00:00Z'

    File.open("tmp/book_#{self.id}_cover.jpg") do
      |io|
      book.add_item('img/cover.jpg',io).cover_image
    end

    File.open("tmp/kdp.css") do
      |io|
      book.add_item('css/style.css',io)
    end

    book.ordered {
      self.sections.each do |section| # each by proper order
        book.add_item("text/#{section.title.parameterize}.xhtml").add_content(StringIO.new(section.render_html_output)).toc_text(section.title)
      end
    }

    book.generate_epub("tmp/book_#{self.id}.epub")
    # delete generated files
	end

  def build_mobi_file
    require 'kindlegen'
    Kindlegen.run("tmp/book_#{self.id}.epub", "-o", "book_#{self.id}.mobi")
  end

	def upload_epub_file
		book_self = self
		File.open("tmp/book_#{self.id}.epub") do |f|
			book_self.generic_epub = f
		end
		self.save!
    # delete epub in tmp
	end
end
