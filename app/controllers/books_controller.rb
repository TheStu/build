class BooksController < ApplicationController

  def new # creates a new book and opens it in the editor
    if @book = Book.create(title: 'untitled', user_id: current_user.id)
      redirect_to editor_book_path(@book)
    else
      redirect_to root_path, alert: "Oops, something went wrong and we weren't able to create a new book. Please try again."
    end
  end

  def editor # the editor, where all the magic happens. No associated view, all rendered via React
    @book = Book.find(params[:id])
    render component: 'Editor', props: { book: @book }
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

    # Never trust parameters from the scary internet, only allow the white list through.
    def book_params
      params.require(:book).permit(:title, :content, :author)
    end
end
