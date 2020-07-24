      var left1=document.body.clientWidth -60,top1=10;  
      var s_left,m_left,e_left=0,s_top,m_top,e_top=0,leftz,topz;
      var maxleft =document.body.clientWidth -60;
      var maxtop =document.body.clientHeight-60;
      var printbtn = document.getElementById('printbtn');
      printbtn.style.left=left1+'px';
      printbtn.style.top=top1+'px';

      printbtn.addEventListener('touchstart', function(event) {
        
        s_left = parseInt(event.touches[0].clientX);
        s_top = parseInt(event.touches[0].clientY);
        e_top=0;
        e_left=0;
      },false);

      printbtn.addEventListener('touchmove', function(event) {
        m_left = event.touches[0].clientX;
        m_top = event.touches[0].clientY;
        e_left = m_left-s_left;
        e_top = m_top-s_top;
        leftz = left1+e_left;
        topz = top1+e_top;    
        if(leftz<=10){
          event.preventDefault();
          printbtn.style.left=10+'px';
          printbtn.style.top=(top1+e_top)+'px';
          e_left=10-left1;
        }

        if(leftz>=maxleft){
          event.preventDefault();
          printbtn.style.left=maxleft+'px';
          printbtn.style.top=(top1+e_top)+'px';
          e_left=maxleft-left1;
        }

        if(topz<=10){
          event.preventDefault();
          printbtn.style.top=10+'px';
          printbtn.style.left=(left1+e_left)+'px';
          e_top=10-top1;
        }

        if(topz>=maxtop){
          event.preventDefault();
          printbtn.style.left=(left1+e_left)+'px';
          printbtn.style.top=maxtop+'px';
          e_top=maxtop-top1;
        }

        event.preventDefault();
        printbtn.style.left=(left1+e_left)+'px';
        printbtn.style.top=(top1+e_top)+'px';

      },false);

      printbtn.addEventListener('touchend', function(event) {
        if(e_left==0&&e_top==0){

        }
        left1 += e_left;
        top1 += e_top;
        printbtn.style.left=left1+'px';
        printbtn.style.top=top1+'px';   
        },false); 