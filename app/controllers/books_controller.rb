class BooksController < ApplicationController

  before_action :set_book, only: [:editor, :destroy, :update, :delete_cover]

  def new # creates a new book and opens it in the editor
    if @book = Book.create(title: 'untitled', user_id: current_user.id, uuid: SecureRandom.uuid)
      if Section.create(book: @book, order_index: 0) # todo - nest sections in books
        redirect_to editor_book_path(@book)
      else
        redirect_to root_path, alert: "Oops, something went wrong and we weren't able to create a new book. Please try again."
      end
    end
  end

  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors.full_messages, status: :unprocessable_entity
    end
  end

  def editor
    gon.auth_token = form_authenticity_token
  end

  def delete_cover
    @book.remove_cover!
    @book.save
    head :ok
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_book
      @book = Book.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.permit(:title, :content, :author, :cover, :publisher, :published_at, :description, :subject, :language, :subtitle, :isbn, :version)
    end
end
