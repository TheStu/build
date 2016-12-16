class Section < ApplicationRecord

	belongs_to :book
	validates_presence_of :title, :order_index

	def render_header
		"
			<div class='pg-header'>
				<h2>#{self.title}</h2>
			</div>
		"
	end

  def render_html_output
    "<?xml version='1.0' encoding='utf-8'?>
    <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'>

    <html xmlns:epub='http://www.idpf.org/2007/ops' xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
      <head>
        <title>1.1 Before you self-publish</title>
        <link rel='stylesheet' type='text/css' href='../Styles/style.css'/>
        <style type='text/css'>
        </style>
      </head>
      <body>" + 
        self.render_header + self.body + 
      "</body>
    </html>"
  end
end
