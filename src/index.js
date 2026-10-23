import {array,text,unique,https,escape,list,note} from './util.js';
export const guide='Supply hotel and rooms: id, name, occupancy (integer), beds, size (string or null), amenities (array), access_note (approved text or null), booking_url (safe HTTPS or null), contact_note. Unknown access information stays unknown. Rates and availability are outside scope.';
export function analyse(input){
 text(input.hotel,'hotel');const rooms=unique(array(input.rooms,'rooms'),'id').map(room=>{
  text(room.name,'name');text(room.beds,'beds');text(room.contact_note,'contact_note');if(!Number.isInteger(room.occupancy)||room.occupancy<1)throw Error('Occupancy must be a positive integer');
  const amenities=array(room.amenities,'amenities').map(a=>text(a,'amenity'));
  if(room.booking_url&&!https(room.booking_url))throw Error('Booking URL must use HTTPS');
  return {id:room.id,name:room.name,occupancy:room.occupancy,beds:room.beds,size:room.size||null,amenities,access_note:room.access_note||null,booking_url:room.booking_url||null,contact_note:room.contact_note};
 });
 return {title:input.hotel+' room comparison',summary:'Compare supplied room facts. Missing information is not a suitability decision. No live availability or rates.',rooms,issues:[],markdown:rooms.map(r=>'## '+r.name+'\n\nOccupancy: '+r.occupancy+'\nBeds: '+r.beds+'\nSize: '+(r.size||'Not supplied')+'\nAccess information: '+(r.access_note||'Ask the provider')+'\n'+r.contact_note).join('\n\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p><div class="grid">'+r.rooms.map(room=>'<section class="card"><span class="badge">Up to '+escape(room.occupancy)+' guests, as supplied</span><h3>'+escape(room.name)+'</h3><dl><dt>Bed configuration</dt><dd>'+escape(room.beds)+'</dd><dt>Room size</dt><dd>'+escape(room.size||'Not supplied')+'</dd></dl><h4>Included amenities</h4>'+list(room.amenities)+'<h4>Supplied access information</h4><p>'+escape(room.access_note||'Not supplied. Ask the accommodation provider about your requirements.')+'</p><p>'+escape(room.contact_note)+'</p>'+(room.booking_url?'<a href="'+escape(room.booking_url)+'">Check with the booking provider</a>':'<p>Ask the provider about booking.</p>')+'</section>').join('')+'</div>'+note('Before booking','Confirm details with the accommodation provider. No room-suitability badge is inferred.');
