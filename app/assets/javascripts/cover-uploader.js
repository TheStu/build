$( document ).on('turbolinks:load', function() {
	if (document.getElementById("upload-btn")) {
		var inputs = document.querySelectorAll( '.input-file' );
		Array.prototype.forEach.call( inputs, function( input )
		{
			var label	 = input.nextElementSibling,
				labelVal = label.innerHTML;

			input.addEventListener( 'change', function( e )
			{
				var fileName = '';
				if( this.files && this.files.length > 1 )
					fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
				else
					fileName = e.target.value.split( '\\' ).pop();

				if( fileName )
					label.querySelector( 'span' ).innerHTML = fileName;
				else
					label.innerHTML = labelVal;
			});
		});
		document.getElementById("upload-btn").addEventListener( 'focus', function(){ document.getElementById("upload-btn").classList.add( 'has-focus' ); });
		document.getElementById("upload-btn").addEventListener( 'blur', function(){ document.getElementById("upload-btn").classList.remove( 'has-focus' ); });
	}
})