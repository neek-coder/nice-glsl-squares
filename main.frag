mat2 rotate(float angle){
    return mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
}

vec3 palette(float t){
    vec3 a=vec3(.578,.598,.828);
    vec3 b=vec3(-.392,.368,-.222);
    vec3 c=vec3(2.148,1.238,1.);
    vec3 d=vec3(0.,.333,-.422);
    
    return a+b*cos(6.28318*(c*t+d));
}

vec4 square(vec2 coord,float s,float a,vec3 c){
    const float smth=5.;// Square smoothness
    const float b=.015;// Brightness
    const float speed=.5;
    
    coord*=rotate(a+3.14159*fract(iTime)*speed);
    
    float f=
    pow(coord.x,smth)+pow(coord.y,smth);
    
    float o=smoothstep(0.,1.,b/abs(abs(f)-s));
    
    return vec4(c*vec3(o),1.);
}

void mainImage(out vec4 fragColor,in vec2 fragCoord){
    
    const float iters=25.;
    
    // Fitting the UV
    vec2 uv=fragCoord/iResolution.xy*2.-1.;
    uv*=iResolution.xy/vec2(min(iResolution.x,iResolution.y));
    uv*=2.;
    
    for(float i=0.;i<iters;i+=1.){
        float cv=50.;// Color variety
        float offset=.15;
        float b=1.;// Brightness
        float size=(1.-sin(iTime+i*offset));
        vec3 c=palette((iTime+i)/cv);
        fragColor+=square(uv,size,.1*i,c)*b;
    }
}